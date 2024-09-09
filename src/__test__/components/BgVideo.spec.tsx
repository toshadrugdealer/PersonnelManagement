import { render } from "@testing-library/react";
import BgVideo from "../../components/BgVideo/BgVideo";
import { expect, test } from "vitest";

test("renders the background video", () => {
  const { getByTestId } = render(<BgVideo />);
  const videoElement = getByTestId("bg-video");

  expect(videoElement).toBeInTheDocument();
  expect(videoElement).toHaveAttribute(
    "src",
    "https://cdn.pixabay.com/video/2023/04/28/160767-822213540_small.mp4"
  );

  expect(videoElement).toHaveProperty("autoplay", true);
  expect(videoElement).toHaveProperty("muted", true);
  expect(videoElement).toHaveProperty("loop", true);
});
