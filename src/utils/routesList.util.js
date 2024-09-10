export function routesList(app, url) {
  function printRoutes(router, path = "") {
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(
          `Method: ${Object.keys(middleware.route.methods).join(", ")} | Path: ${url}${path}${middleware.route.path}`,
        );
      } else if (middleware.name === "router") {
        printRoutes(middleware.handle, path);
      }
    });
  }

  console.log("Routes:");
  printRoutes(app._router, "");
}
