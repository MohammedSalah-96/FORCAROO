import Icon from "/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React, { useEffect, useState } from "react";
import { productsFilter } from "../data";
import { useLocalizedData } from "../hooks/useLocalizedData";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";

export default function MainNavigationMenu() {
  const { navLinks, productsList } = useLocalizedData();

  const categoryTabs = productsFilter.filter(
    (item) => item.categoryFilter !== "all",
  );

  const [tabValueFirst, setTabValueFirst] = React.useState(
    categoryTabs[0]?.categoryFilter ?? "",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (window.scrollY >= 50) {
      setIsScroll(true);
    }

    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <header
      className={`${isScroll ? "top-0 px-0" : "top-4 px-8"} fixed left-0 w-full transition-all duration-300 z-50`}
    >
      <div
        className={`flex h-[84px] items-center justify-between px-4 md:px-8 ${isScroll ? "bg-slate-100" : "bg-slate-100 rounded-2xl"}`}
      >
        {/* Logo */}
        <div className="logo h-full flex z-[1]">
          <div className="img-logo flex justify-start items-center gap-1 py-2 px-4 md:ps-4 lg:px-3">
            <Link to="/">
              <img
                src={Icon}
                height={100}
                width={100}
                className="h-auto w-20 md:w-[90px] lg:w-[100px]"
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:block w-full">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link, index) => {
                if (link.path === "/products") {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="h-full flex items-center justify-center mx-4 bg-transparent relative transition-all duration-300 ease-in-out text-slate-500 hover:text-forcarooLightGreen text-lg font-semibold">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[900px] p-4">
                          <Tabs
                            value={tabValueFirst}
                            onValueChange={setTabValueFirst}
                            className="flex gap-6"
                          >
                            {/* Sidebar Tabs */}
                            <TabsList className="h-auto w-52 flex flex-col items-start justify-start gap-2 bg-transparent">
                              {categoryTabs.map((filter) => (
                                <TabsTrigger
                                  key={filter.id}
                                  value={filter.categoryFilter}
                                  onMouseEnter={() =>
                                    setTabValueFirst(filter.categoryFilter)
                                  }
                                  className={
                                    tabValueFirst === filter.categoryFilter
                                      ? "!bg-forcarooLightGreen !text-slate-200"
                                      : ""
                                  }
                                >
                                  {filter.categoryFilter
                                    .split("-")
                                    .map(
                                      (part) =>
                                        part[0]?.toUpperCase() + part.slice(1),
                                    )
                                    .join(" ")}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {/* Content */}
                            <div className="flex-1">
                              {categoryTabs.map((filter) => {
                                const products = productsList.filter(
                                  (product) =>
                                    product.category === filter.categoryFilter,
                                );

                                return (
                                  <TabsContent
                                    key={filter.categoryFilter}
                                    value={filter.categoryFilter}
                                  >
                                    <div className="grid gap-4 lg:grid-cols-2">
                                      {products.map((product) => (
                                        <Link
                                          to={`products/${product.id}`}
                                          key={product.name}
                                        >
                                          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-shadow">
                                            <div className="h-32 w-32 mx-auto overflow-hidden rounded-xl">
                                              <img
                                                src={product.productImg}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                              />
                                            </div>
                                            <div>
                                              <h3 className="mb-1 font-medium text-center">
                                                {product.name}
                                              </h3>
                                            </div>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </TabsContent>
                                );
                              })}
                            </div>
                          </Tabs>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }: any) =>
                        `h-full flex items-center justify-center mx-4 relative transition-all duration-300 ease-in-out ${
                          isActive
                            ? "text-forcarooLightGreen"
                            : "text-slate-500"
                        } hover:text-forcarooLightGreen text-lg font-semibold`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </NavigationMenuItem>
                );
              })}

              {/* Products */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[900px] p-4">
                    <Tabs
                      value={tabValueFirst}
                      onValueChange={setTabValueFirst}
                      className="flex gap-6"
                    >
                      <TabsList className="h-auto w-52 flex flex-col items-start justify-start gap-2 bg-transparent">
                        {categoryTabs.map((filter) => (
                          <TabsTrigger
                            key={filter.id}
                            value={filter.categoryFilter}
                            onMouseEnter={() =>
                              setTabValueFirst(filter.categoryFilter)
                            }
                            className={
                              tabValueFirst === filter.categoryFilter
                                ? "!bg-forcarooLightGreen !text-slate-200"
                                : ""
                            }
                          >
                            {filter.categoryFilter
                              .split("-")
                              .map(
                                (part) =>
                                  part[0]?.toUpperCase() + part.slice(1),
                              )
                              .join(" ")}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <div className="flex-1">
                        {categoryTabs.map((filter) => {
                          const products = productsList.filter(
                            (product) =>
                              product.category === filter.categoryFilter,
                          );
                          return (
                            <TabsContent
                              key={filter.categoryFilter}
                              value={filter.categoryFilter}
                            >
                              <div className="grid gap-4 lg:grid-cols-2">
                                {products.map((product) => (
                                  <Link
                                    to={`products/${product.id}`}
                                    key={product.name}
                                  >
                                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-shadow">
                                      <div className="h-32 w-32 mx-auto overflow-hidden rounded-xl">
                                        <img
                                          src={product.productImg}
                                          alt={product.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-1 text-lg font-semibold">
                                          {product.name}
                                        </h3>
                                        <h4 className="my-1 text-forcarooText text-lg font-semibold">
                                          ${product.price.toFixed(2)}
                                        </h4>
                                        <ProductRating
                                          rating={product.rating}
                                        />
                                        <hr className="w-3/5 mt-3 mb-5 border-zinc-200" />
                                        <p>{product.description}</p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </TabsContent>
                          );
                        })}
                      </div>
                    </Tabs>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div
          className={`md:hidden absolute left-0 top-full w-full bg-white border-t border-slate-200 shadow-xl transition-all duration-300 ${
            mobileMenuOpen ? "block" : "hidden"
          } z-50 max-h-[calc(100vh-84px)] overflow-y-auto`}
        >
          <div className="space-y-3 p-4">
            {navLinks.map((link, index) => {
              if (link.path === "/products") {
                const activeProducts = productsList.filter(
                  (product) => product.category === tabValueFirst,
                );

                return (
                  <div
                    key={index}
                    className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">
                      {link.name}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {categoryTabs.map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                            tabValueFirst === filter.categoryFilter
                              ? "border-forcarooLightGreen bg-forcarooLightGreen text-slate-50"
                              : "border-slate-200 bg-white text-slate-700 hover:border-forcarooLightGreen hover:text-forcarooLightGreen"
                          }`}
                          onClick={() =>
                            setTabValueFirst(filter.categoryFilter)
                          }
                        >
                          {filter.categoryFilter
                            .split("-")
                            .map(
                              (part) => part[0]?.toUpperCase() + part.slice(1),
                            )
                            .join(" ")}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {activeProducts.map((product) => (
                        <Link
                          to={`products/${product.id}`}
                          key={product.id}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 transition hover:shadow-sm"
                        >
                          <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={product.productImg}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-800">
                              {product.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  to={link.path}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-semibold text-slate-700 transition hover:border-forcarooLightGreen hover:text-forcarooLightGreen"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
