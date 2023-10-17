export const shortenEthereumAddress = (address, length = 5) => {
  if (address.length <= length * 2) {
    // If the address is already shorter than the desired length, return it as is.
    return address;
  } else {
    // Calculate the number of characters to be displayed from the start and end of the address.
    const startChars = address.slice(0, length);
    const endChars = address.slice(-length);

    // Construct the shortened address with "..." in the middle.
    return `${startChars}...${endChars}`;
  }
};
