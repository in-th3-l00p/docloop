use wasm_bindgen::prelude::*;
use js_sys::{Array, JsString};
use printpdf::{PdfDocument, PdfSaveOptions, image::RawImage};
use base64::{self, prelude::BASE64_STANDARD, Engine};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

#[wasm_bindgen]
pub fn to_pdf(images: Array) -> JsString {
    let mut doc = PdfDocument::new("Hello world");
    let mut warnings = Vec::new();

    for image in images.iter() {
        let image_base64 = match image.as_string() {
            Some(image_base64) => image_base64,
            None => {
                error("error occured when getting image base64");
                continue;
            }
        };
        let image_base64 = image_base64
            .split(";base64,")
            .nth(1)
            .unwrap()
            .to_string();
        let decoded = BASE64_STANDARD.decode(image_base64).unwrap();
        let image = &RawImage::decode_from_bytes(&decoded, &mut warnings);
        match image {
            Ok(image) => {
                doc.add_image(image);
            }
            Err(e) => {
                error(&format!("error occured when decoding image: {:?}", e));
                continue;
            }
        }
    }
    
    let base64_string = BASE64_STANDARD.encode(
        doc.save(&PdfSaveOptions::default(), &mut warnings)
    );
    JsString::from(base64_string)
}