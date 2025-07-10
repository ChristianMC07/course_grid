import { join } from "path";
import sanitize from "sanitize-html";
import { promises as fs } from "fs";
import supabase from "@/utils/supabase/client";

// randomly generates a number between the range of low and high
function getRandom(low: number = 1, high: number = 10) {
    let randomNumber: number;
    // calculate random number
    randomNumber = Math.round(Math.random() * (high - low)) + low;
    // returning value
    return randomNumber;
}

function addKey(functionToCall: Function, myKeyCode: string = "Enter") {
    // this example exposes issue with scoping and event handlers and how it is solved with arrow function

    // wire up event listener
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        // is the key released the provided key? Check keyCode via Event object
        if (e.code === myKeyCode) {
            // pressing the enter key will force some browsers to refresh
            // this command stops the event from going further
            e.preventDefault();
            // call provided callback to do everything else that needs to be done
            functionToCall();
            // this also helps the event from propagating in some browsers
            return false;
        }
    });
}

// ------------------------------------ challenge solution
async function getJSONData(
    retrieveScript: string,
    success?: Function,
    failure?: Function
) {
    if (success !== undefined && failure !== undefined) {
        fetch(retrieveScript)
            .then((response: Response) => response.json())
            .then((data: any) => success(data))
            .catch((error: Error) => failure(error.message));
    } else {
        try {
            const response: Response = await fetch(retrieveScript);
            const data: any = await response.json();
            return data;
        } catch (error: any) {
            console.log(`>>> FETCH ERROR: ${error.message}`);
            return null;
        }
    }
}
// -------------------------------------------------------

function sendJSONData(
    sendURL: string,
    sendJSON: any,
    success: Function,
    failure: Function,
    debug: boolean = false
) {
    fetch(sendURL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(sendJSON),
    })
        .then((response: Response) => response.text())
        .then((responseText: string) => success(responseText))
        .catch((error: Error) => {
            failure(error);
            if (debug) throw error;
        });
}

// -----------------------------------------------------------
function capitalizeWords(sentence: string) {
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

// -----------------------------------------------------------


async function createImage(image: File): Promise<string | null> {
    const sanitizedFileName = sanitize(image.name);
    const timeStampedFileName = `${Date.now()}_${sanitizedFileName}`;

    if (process.env.NODE_ENV === "development") {
        //save to public images

        const projectRoot = process.cwd();
        const imagesFolder = join(projectRoot, "public", "images");
        const filePath = join(imagesFolder, timeStampedFileName);
        const bytes = await image.arrayBuffer();
        const uint8Array = new Uint8Array(bytes);
        await fs.mkdir(imagesFolder, { recursive: true });
        await fs.writeFile(filePath, uint8Array);
        return timeStampedFileName;
    } else {
        const bytes = await image.arrayBuffer();
        const uint8Array = new Uint8Array(bytes);

        const { data, error } = await supabase.storage
            .from("course-images")
            .upload(timeStampedFileName, uint8Array, {
                contentType: image.type,
                upsert: false,
            });

        if (error) {
            console.log("Upload error", error.message);
            return null;
        }

        return data?.path ?? null;
    }
}

export {
    getRandom,
    addKey,
    getJSONData,
    sendJSONData,
    capitalizeWords,
    createImage,
};
