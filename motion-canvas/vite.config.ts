import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import path from "path";
import { getProjects } from "./getAllProjects";
export default defineConfig({
  plugins: [
    motionCanvas({
      project: getProjects("./src/projects"),
      output: path.resolve(__dirname, "../../output"),
    }),
  ],
  resolve: {
    alias: {
      "@videos": path.resolve(
        __dirname,
        "../../Yandex.Disk.localized/resources/videos"
      ),
      "@images": path.resolve(
        __dirname,
        "../../Yandex.Disk.localized/resources/images"
      ),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
