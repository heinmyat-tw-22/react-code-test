const getRandomItems = <T>(items: T[], itemCount: number) => {
  const newItems: T[] = [];
  for (var i = 0; i < itemCount; i++) {
    const idx = Math.floor(Math.random() * items.length);
    newItems.push(items[idx]);
    items.splice(idx, 1);
  }

  return newItems;
};

export default getRandomItems;
