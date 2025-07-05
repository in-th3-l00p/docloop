use wasm_bindgen::prelude::*;
use js_sys::Array;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn to_pdf(images: Array) {
    for i in 0..images.length() {
        if let Some(image) = images.get(i).as_string() {
            log(&format!("image: {}", image));
        }
    }
}