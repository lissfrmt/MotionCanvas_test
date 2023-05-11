import { makeScene2D } from "@motion-canvas/2d";
import { Rect, Txt } from "@motion-canvas/2d/lib/components";
import colors from "tailwindcss/colors";
import { waitFor } from "@motion-canvas/core/lib/flow";
export default makeScene2D(function* (view) {
  
  view.add(
    <>
      <Rect fill={colors.neutral[900]} padding={50} width={1920} height={1080}>
        <Txt
          fill={colors.white}
          text={
            "Добро пожаловать в тестовое задание по производственной практике !"
          }
        />
      </Rect>
    </>
  );

  yield* waitFor(1);
});
