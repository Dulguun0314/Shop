import crypto from "crypto"; // Node.js-д суурилсан криптографийн сан, аюулгүй байдлын үйлдлүүдийг хийхэд ашигладаг.

const SECRET = "DULGUUN"; // SECRET нь нууц үг хэшлэхэд нэмэлт аюулгүй байдлыг хангахын тулд ашиглагдана.

export const random = () => crypto.randomBytes(128).toString("base64");
// random() функц нь 128 байтын санамсаргүй утга үүсгэн, үүнийг base64 хэлбэрт хөрвүүлнэ.

export const authentication = (salt: string, password: string) => {
  // authentication() функц нь хэрэглэгчийн давс болон нууц үгийг ашиглан хэш үүсгэнэ.
  return (
    crypto
      .createHmac("sha256", [salt, password].join("/"))
      // createHmac() нь "sha256" алгоритмыг ашиглан HMAC хэш үүсгэдэг.
      // salt болон password-г "/"-ээр нэгтгэж хэш үүсгэх процессийг эхлүүлнэ.
      .update(SECRET) // Нууц (SECRET) ашиглан хэш үүсгэх үйл явцыг сайжруулна.
      .digest("hex")
  ); // Хэш үүсгэгдсэний дараа үүнийг hex форматаар буцаана.
};
