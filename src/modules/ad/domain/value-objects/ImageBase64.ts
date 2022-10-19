import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class ImageBase64 {
  readonly image: string;

  constructor(imageBase64: string) {
    this.validateFile(imageBase64);
    this.image = imageBase64;
  }

  private validateFile(imageBase64: string): void {
    if (!this.isValidImage(imageBase64))
      throw new ErrorCreatingAd("File is not a valid image");

    if (!this.isValidImage(imageBase64))
      throw new ErrorCreatingAd("File is not a Base64");
  }

  private isValidImage(base64String: string): boolean {
    const base64RegExp = new RegExp(
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/
    );

    const { imageData } = this.getData(base64String);

    if (base64RegExp.test(imageData)) {
      return true;
    } else {
      return false;
    }
  }

  private fileIsBase64(base64String: string) {}

  private getData(base64String: string): {
    mimetype: string;
    imageData: string;
  } {
    const base64Array = base64String.split(";");
    const metaDataArray = base64Array[0].split(":");
    const imageDataArray = base64Array[1].split(",");
    return {
      mimetype: metaDataArray[1],
      imageData: imageDataArray[1],
    };
  }
}
