import { makeProject } from "@motion-canvas/core";
import "@/global.css";
import scene1 from "./scenes/scene1?scene";
import scene2 from "./scenes/scene2?scene";

export default makeProject({
  name: "block1.lesson1",
  scenes: [scene1, scene2],
});
