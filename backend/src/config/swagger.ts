import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

const routesDirectory = path.join(__dirname, "../routes");

function findRouteFiles(dir: string): string[] {
  const routeFiles: string[] = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively find route files in it
      routeFiles.push(...findRouteFiles(filePath));
    } else if (file.endsWith(".ts") && file !== "routes.ts") {
      // If it's a TypeScript file, include it as a route file
      routeFiles.push(filePath);
    }
  });

  return routeFiles;
}

const apiFiles: string[] = findRouteFiles(routesDirectory);

const options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "API documentation for user authentication.",
    },
    basePath: "/",
  },
  apis: apiFiles,
};

const swaggerSpec = swaggerJsdoc(options);

// Convert the Swagger spec to JSON format
const swaggerJson = JSON.stringify(swaggerSpec, null, 2);

// Specify the file name where you want to save the JSON
const jsonFileName = "swagger.json";

// Write the JSON content to the file
fs.writeFileSync(jsonFileName, swaggerJson);

console.log(`Swagger spec saved to ${jsonFileName}`);
