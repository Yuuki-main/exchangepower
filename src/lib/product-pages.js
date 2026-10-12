import "server-only";

import {
  getCardPhoto,
  isOwnPhoto,
  getCategoryHub,
  getProduct,
  getProductBody,
  getProductPath,
  getProductsByCategory,
  getRelatedProducts,
} from "./content";
import { CATEGORIES } from "./content-schema.js";
import { renderMarkdown } from "./markdown";
import { buildMetadata } from "./seo";

/**
 * Data loading for the product and category routes, shared by the four
 * categories so each route file stays a few lines long.
 */

/** @typedef {import("./content-schema.js").Product} Product */
/** @typedef {import("./content-schema.js").ProductCategory} ProductCategory */
/** @typedef {{ label: string, href: string }} Crumb */

/**
 * A product reduced to what cards and lists need.
 * @param {Product} product
 */
export function toProductSummary(product) {
  return {
    title: product.title,
    href: getProductPath(product),
    category: CATEGORIES[product.category].label,
    keyFacts: product.keyFacts,
    highlights: product.highlights,
    image: product.image,
    photo: getCardPhoto(product.image, `products/${product.slug}`),
    photoIsOwn: isOwnPhoto(product.image),
  };
}

/** @typedef {ReturnType<typeof toProductSummary>} ProductSummary */

/** @param {Product} hub @returns {Crumb[]} */
function hubCrumbs(hub) {
  return [
    { label: "Home", href: "/" },
    { label: hub.title, href: getProductPath(hub) },
  ];
}

// ---------------------------------------------------------------- hubs

/** @param {ProductCategory} category */
export function hubMetadata(category) {
  const hub = getCategoryHub(category);
  return buildMetadata({
    ...hub.seo,
    path: getProductPath(hub),
    absoluteTitle: true,
  });
}

/** @param {ProductCategory} category */
export function getHubPageData(category) {
  const hub = getCategoryHub(category);
  return {
    hub,
    breadcrumbs: hubCrumbs(hub),
    products: getProductsByCategory(category).map(toProductSummary),
    // Approved new intro wins; otherwise the live copy (verbatim, see CONTENT-NOTES 3.1).
    introHtml: renderMarkdown(hub.hubIntroOverride ?? getProductBody(hub)),
    introIsLiveCopy: hub.hubIntroOverride == null,
  };
}

// ---------------------------------------------------------------- details

/** @param {ProductCategory} category */
export function productStaticParams(category) {
  return getProductsByCategory(category).map((p) => ({ slug: p.slug }));
}

/**
 * @param {ProductCategory} category
 * @param {string} slug
 */
export function productMetadata(category, slug) {
  const product = getProduct(category, slug);
  if (!product) return {};
  return buildMetadata({
    ...product.seo,
    path: getProductPath(product),
    absoluteTitle: true,
  });
}

/**
 * Everything a product page needs, or null for an unknown slug (the route
 * then calls notFound()).
 * @param {ProductCategory} category
 * @param {string} slug
 */
export function getProductPageData(category, slug) {
  const product = getProduct(category, slug);
  if (!product) return null;
  const hub = getCategoryHub(category);
  return {
    product,
    hubTitle: hub.title,
    breadcrumbs: [
      ...hubCrumbs(hub),
      { label: product.title, href: getProductPath(product) },
    ],
    bodyHtml: renderMarkdown(getProductBody(product)),
    related: getRelatedProducts(product).map(toProductSummary),
  };
}
