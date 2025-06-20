const API_BASE_URL = 'http://13.77.105.11:5151';

export class ApiService {
    static async generateText(request) {
        const response = await fetch(`${API_BASE_URL}/generate-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Failed to generate text');
        }

        return response.json();
    }

    static async generateAudio(request) {
        console.log("Requesting audio for text:", request.text);

        const response = await fetch(`${API_BASE_URL}/generate-audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: request.text,
                voice: request.voice || 'Despina',
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Audio API Error:", text);
            throw new Error(`Failed to generate audio: ${response.status}`);
        }

        // Periksa content-type response
        const contentType = response.headers.get('content-type');
        console.log("Response content-type:", contentType);

        const blob = await response.blob();
        console.log("Audio blob size:", blob.size, "type:", blob.type);

        // Validasi ukuran blob
        if (blob.size < 1000) { // Jika terlalu kecil (kurang dari 1KB)
            console.warn("Audio blob seems too small:", blob.size, "bytes");
        }

        return blob;
    }
}