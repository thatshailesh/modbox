export const getDigitsFrequencies = (firstDigits): number[] => {
    const digitCounts = Array(10).fill(0)

    for(let n of firstDigits) {
        digitCounts[n]++
    }

    return digitCounts
}