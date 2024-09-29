const translate = (
  {id, en}: {id: string; en: string},
  language: 'id' | 'en',
) => {
  if (language === 'en') {
    return en;
  }
  return id;
};

export default translate;
