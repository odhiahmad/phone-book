export const capitalizeSentence = (sentence: string) => {
  const mySentence = sentence.toLowerCase();
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
  }
  const wordJoin = words.join(" ");
  return wordJoin;
};

export const limitCharacter = (sentence: string) => {
  const panjangMaksimum = 10; // Ganti dengan panjang maksimum yang Anda inginkan
  if (sentence.length > panjangMaksimum) {
    sentence = sentence.substring(0, panjangMaksimum) + " ...";
    return sentence;
  } else {
    return sentence;
  }
};
