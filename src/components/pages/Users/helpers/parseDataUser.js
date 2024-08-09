// Dependencies
import moment from 'moment';

export const parseDataUser = (data) => {
  return {
    name: data.name,
    email: data.email,
    profession: data.profession,
    birthday: moment(data.dateBirthday).format('YYYY-MM-DD'),
    education:
      data.educationSelect === undefined ? null : data.educationSelect.label,
    cvUrl: data.cvUrl,
    linkedinUser: data.linkedinUser,
    twitterUser: data.twitterUser,
    instagramUser: data.instagramUser,
    facebookUser: data.facebookUser,
  };
};
