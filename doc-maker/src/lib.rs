use wasm_bindgen::prelude::*;
use js_sys::{Array, JsString};
use printpdf::{image::RawImage, Mm, PdfDocument, PdfPage, PdfSaveOptions, PdfWarnMsg, Px, XObjectTransform};

use base64::{self, prelude::BASE64_STANDARD, Engine};
use printpdf::Op::UseXobject;

const DEFAULT_DPI: f32 = 300.0;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

fn get_image_from_base64(
    image: &JsValue,
    warnings: &mut Vec<PdfWarnMsg>
) -> Result<RawImage, String> {
    let image_base64 = match image.as_string() {
        Some(image_base64) => image_base64,
        None => {
            return Err("error occured when getting image base64".to_string());
        }
    };
    let image_base64 = image_base64
        .split(";base64,")
        .nth(1)
        .unwrap()
        .to_string();
    let decoded = BASE64_STANDARD.decode(image_base64).unwrap();
    RawImage::decode_from_bytes(&decoded, warnings)
}

fn px_to_mm(px: usize) -> Mm {
    Mm::from(Px(px).into_pt(DEFAULT_DPI))
}

#[wasm_bindgen]
pub fn to_pdf(images: Array) -> JsString {
    let mut doc = PdfDocument::new("Hello world");
    let mut warnings = Vec::new();

    let mut pages = Vec::new();
    for image in images.iter() {
        match get_image_from_base64(&image, &mut warnings) {
            Ok(image) => {
                pages.push(PdfPage::new(
                    px_to_mm(image.width),
                    px_to_mm(image.height),
                    vec!(
                        UseXobject {
                            id: doc.add_image(&image),
                            transform: XObjectTransform::default(),
                        }
                    )
                ));
            }
            Err(e) => {
                error(&format!("error occured when adding image: {:?}", e));
            }
        }
    }

    let base64_string = BASE64_STANDARD.encode(
        doc
            .with_pages(pages)
            .save(&PdfSaveOptions::default(), &mut warnings)
    );
    JsString::from(base64_string)
}