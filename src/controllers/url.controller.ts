import AppError from "../utils/app-error";
import { catchAsyncError } from "../utils/catch-async-error";
import * as urlService from "../services/url.service";

export const shortenUrl = catchAsyncError(async (req, res, next) => {
  const { originalURL } = req.body;

  if (!originalURL) return next(new AppError("You didn't include url to shorten", 400));

  const shorterURL = await urlService.createShortUrl(originalURL);

  res.status(200).json({
    status: "success",
    data: {
      shorterURL,
    },
  });
});

export const redirectToOriginalUrl = catchAsyncError(async (req, res, _) => {
  const shorterUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const originalURL = await urlService.getUrl(shorterUrl);

  res.redirect(originalURL);
});
