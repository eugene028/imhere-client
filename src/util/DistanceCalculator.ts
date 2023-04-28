// HaversineFormula

/* Hongik univ T 동*/
const referenceLatitude = 37.55011;
const referenceLongitude = 126.92463;

const earthRadius = 6371;

function degToRad(deg: number) {
    return deg * (Math.PI/180);
}

export function calculateDistance(targetLatitude: number, targetLongitude: number) {
    const dLat = degToRad(referenceLatitude-targetLatitude);
    const dLon = degToRad(referenceLongitude-targetLongitude);

    const radLat1 = degToRad(targetLatitude);
    const radLat2 = degToRad(referenceLatitude);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(radLat1) * Math.cos(radLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadius * c * 1000;
}


