use wasm_bindgen::prelude::*;
use js_sys::{Array, JsString};
use printpdf::{Mm, PdfDocument, PdfPage, PdfSaveOptions};
use base64::{self, prelude::BASE64_STANDARD, Engine};

#[wasm_bindgen]
pub fn to_pdf(_images: Array) -> JsString {
    let mut doc = PdfDocument::new("Hello world");
    let page = PdfPage::new(Mm(210.0), Mm(297.0), vec![]);
    let mut warnings = Vec::new();
    
    let doc_with_pages = doc.with_pages(vec![page]);
    let pdf_bytes = doc_with_pages.save(&PdfSaveOptions::default(), &mut warnings);
    
    let base64_string = BASE64_STANDARD.encode(&pdf_bytes);
    JsString::from(base64_string)
}