import { ComponentType } from "react";
import { Home } from "./pages/Home";
import { ToolsDirectory } from "./pages/ToolsDirectory";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { Disclaimer } from "./pages/Disclaimer";
import { blogPosts } from "./data/blogPosts";
import { JsonFormatter } from "./pages/tools/JsonFormatter";
import { CssMinifier } from "./pages/tools/CssMinifier";
import { Base64Encoder } from "./pages/tools/Base64Encoder";
import { UuidGenerator } from "./pages/tools/UuidGenerator";
import { RegexTester } from "./pages/tools/RegexTester";
import { ColorConverter } from "./pages/tools/ColorConverter";
import { HtmlFormatter } from "./pages/tools/HtmlFormatter";
import { TimestampConverter } from "./pages/tools/TimestampConverter";
import { JsonValidator } from "./pages/tools/JsonValidator";
import { CssBeautifier } from "./pages/tools/CssBeautifier";
import { HtmlMinifier } from "./pages/tools/HtmlMinifier";
import { UrlEncoder } from "./pages/tools/UrlEncoder";
import { PasswordGenerator } from "./pages/tools/PasswordGenerator";
import { WordCounter } from "./pages/tools/WordCounter";
import { CaseConverter } from "./pages/tools/CaseConverter";
import { LoremIpsumGenerator } from "./pages/tools/LoremIpsumGenerator";
import { BmiCalculator } from "./pages/tools/BmiCalculator";
import { AgeCalculator } from "./pages/tools/AgeCalculator";
import { PercentageCalculator } from "./pages/tools/PercentageCalculator";
import { RandomNumberGenerator } from "./pages/tools/RandomNumberGenerator";
import { HexToRgb } from "./pages/tools/HexToRgb";
import { RgbToHex } from "./pages/tools/RgbToHex";
import { SlugGenerator } from "./pages/tools/SlugGenerator";
import { HtmlEncoder } from "./pages/tools/HtmlEncoder";
import { BinaryConverter } from "./pages/tools/BinaryConverter";
import { MarkdownPreview } from "./pages/tools/MarkdownPreview";
import { QrCodeGenerator } from "./pages/tools/QrCodeGenerator";
import { HashGenerator } from "./pages/tools/HashGenerator";
import { JsonToCsv } from "./pages/tools/JsonToCsv";
import { CsvToJson } from "./pages/tools/CsvToJson";
import { DiscountCalculator } from "./pages/tools/DiscountCalculator";
import { TipCalculator } from "./pages/tools/TipCalculator";
import { LoanCalculator } from "./pages/tools/LoanCalculator";
import { DateDifferenceCalculator } from "./pages/tools/DateDifferenceCalculator";
import { TemperatureConverter } from "./pages/tools/TemperatureConverter";
import { UnitConverter } from "./pages/tools/UnitConverter";
import { TextReverser } from "./pages/tools/TextReverser";
import { RemoveDuplicates } from "./pages/tools/RemoveDuplicates";
import { SortTextLines } from "./pages/tools/SortTextLines";
import { ColorPaletteGenerator } from "./pages/tools/ColorPaletteGenerator";
import { GradientGenerator } from "./pages/tools/GradientGenerator";
import { JwtDecoder } from "./pages/tools/JwtDecoder";
import { XmlFormatter } from "./pages/tools/XmlFormatter";
import { SqlFormatter } from "./pages/tools/SqlFormatter";
import { NotFound } from "./pages/NotFound";

export const routeComponentMap: Record<string, ComponentType> = {
  "/": Home,
  "/blog": Blog,
  "/about-us": AboutUs,
  "/contact": ContactUs,
  "/contact-us": ContactUs,
  "/privacy-policy": PrivacyPolicy,
  "/terms-and-conditions": TermsAndConditions,
  "/disclaimer": Disclaimer,
  "/tools": ToolsDirectory,
  "/tools/json-formatter": JsonFormatter,
  "/tools/json-validator": JsonValidator,
  "/tools/css-minifier": CssMinifier,
  "/tools/css-beautifier": CssBeautifier,
  "/tools/html-formatter": HtmlFormatter,
  "/tools/html-minifier": HtmlMinifier,
  "/tools/base64-encoder": Base64Encoder,
  "/tools/url-encoder": UrlEncoder,
  "/tools/html-encoder": HtmlEncoder,
  "/tools/uuid-generator": UuidGenerator,
  "/tools/password-generator": PasswordGenerator,
  "/tools/random-number-generator": RandomNumberGenerator,
  "/tools/lorem-ipsum-generator": LoremIpsumGenerator,
  "/tools/qr-code-generator": QrCodeGenerator,
  "/tools/hash-generator": HashGenerator,
  "/tools/regex-tester": RegexTester,
  "/tools/timestamp-converter": TimestampConverter,
  "/tools/color-converter": ColorConverter,
  "/tools/hex-to-rgb": HexToRgb,
  "/tools/rgb-to-hex": RgbToHex,
  "/tools/temperature-converter": TemperatureConverter,
  "/tools/unit-converter": UnitConverter,
  "/tools/word-counter": WordCounter,
  "/tools/case-converter": CaseConverter,
  "/tools/slug-generator": SlugGenerator,
  "/tools/text-reverser": TextReverser,
  "/tools/remove-duplicates": RemoveDuplicates,
  "/tools/sort-text-lines": SortTextLines,
  "/tools/binary-converter": BinaryConverter,
  "/tools/markdown-preview": MarkdownPreview,
  "/tools/json-to-csv": JsonToCsv,
  "/tools/csv-to-json": CsvToJson,
  "/tools/jwt-decoder": JwtDecoder,
  "/tools/xml-formatter": XmlFormatter,
  "/tools/sql-formatter": SqlFormatter,
  "/tools/bmi-calculator": BmiCalculator,
  "/tools/age-calculator": AgeCalculator,
  "/tools/percentage-calculator": PercentageCalculator,
  "/tools/discount-calculator": DiscountCalculator,
  "/tools/tip-calculator": TipCalculator,
  "/tools/loan-calculator": LoanCalculator,
  "/tools/date-difference-calculator": DateDifferenceCalculator,
  "/tools/color-palette-generator": ColorPaletteGenerator,
  "/tools/gradient-generator": GradientGenerator,
};

const toolRoutePaths = Object.keys(routeComponentMap).filter(
  (path) => path.startsWith("/tools/")
);
const toolRoutePathSet = new Set(toolRoutePaths);

export function isToolRoute(pathname: string): boolean {
  return toolRoutePathSet.has(pathname);
}

interface RouteMeta {
  title: string;
  description: string;
}

const defaultMeta: RouteMeta = {
  title: "Softtooles - Developer Tools",
  description: "Fast, mobile-friendly, privacy-first developer utilities with premium UI.",
};

// Generate blog metadata
const blogMetaMap: Record<string, RouteMeta> = {};
blogPosts.forEach((post) => {
  blogMetaMap[`/blog/${post.slug}`] = {
    title: `${post.title} | Blog | Softtooles`,
    description: `${post.excerpt} - Read more about ${post.category} on Softtooles blog.`,
  };
});

export const routeMetaMap: Record<string, RouteMeta> = {
  "/": {
    title: "Softtooles - Developer Tools",
    description: "Fast online developer tools with premium UI, SEO-ready pages, and mobile-first performance.",
  },
  "/tools": {
    title: "All Developer Tools | Softtooles",
    description: "Browse all developer utilities including formatters, converters, generators, and calculators.",
  },
  "/blog": {
    title: "Blog | Softtooles",
    description: "Read updates, tutorials, and product design insights from Softtooles.",
  },
  "/about-us": {
    title: "About Us | Softtooles",
    description: "Learn about Softtooles and our approach to building fast, privacy-first dev tools.",
  },
  "/contact": {
    title: "Contact Us | Softtooles",
    description: "Contact Softtooles for support, feedback, and collaboration.",
  },
  "/contact-us": {
    title: "Contact Us | Softtooles",
    description: "Contact Softtooles for support, feedback, and collaboration.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Softtooles",
    description: "Understand how Softtooles handles privacy and data usage.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Softtooles",
    description: "Review the terms and conditions for using Softtooles.",
  },
  "/disclaimer": {
    title: "Disclaimer | Softtooles",
    description: "Read the Softtooles disclaimer and limitations of tool usage.",
  },
  ...blogMetaMap,
};

export function resolveRouteComponent(pathname: string): ComponentType {
  if (pathname === "") {
    return Home;
  }

  const normalizedPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  // Check for blog post routes
  if (normalizedPath.startsWith("/blog/")) {
    const slug = normalizedPath.replace("/blog/", "");
    if (blogPosts.some((post) => post.slug === slug)) {
      // Return a wrapper component that passes the slug to BlogPost
      return () => <BlogPost slug={slug} />;
    }
  }

  return routeComponentMap[normalizedPath] ?? NotFound;
}

export function resolveRouteMeta(pathname: string): RouteMeta {
  const normalizedPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  // Check in merged routeMetaMap first (includes blog metadata)
  if (routeMetaMap[normalizedPath]) {
    return routeMetaMap[normalizedPath];
  }

  if (normalizedPath.startsWith("/tools/")) {
    const toolName = normalizedPath.replace("/tools/", "").split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
    return {
      title: `${toolName} | Softtooles`,
      description: `${toolName} tool for developers. Fast, browser-based, and mobile-friendly utility at Softtooles.`,
    };
  }

  return defaultMeta;
}
