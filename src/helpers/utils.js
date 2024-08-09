export const sortListObjects = (listObjects) => {
  listObjects.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
};

export const sortListByLabel = (listObjects) => {
  listObjects.sort((a, b) => {
    if (a.label > b.label) {
      return 1;
    }
    if (a.label < b.label) {
      return -1;
    }
    return 0;
  });
};

export const extractCurrency = (currency) => {
  return currency
    .substring(currency.length - 5, currency.length)
    .substring(1, 4);
};

export const redirectPageOffers = (dataUser, navigate) => {
  if (dataUser.role === 'USER_ROLE') {
    navigate(sessionStorage.getItem('joboffer-path') || '/dashboard', {
      replace: true,
    });
  } else {
    navigate(sessionStorage.getItem('joboffer-path') || '/sectors', {
      replace: true,
    });
  }
};

export const extractIdFromObject = (object) => {
  return { ...object, id: undefined };
};

export const getPasswordRegex = () => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
};
