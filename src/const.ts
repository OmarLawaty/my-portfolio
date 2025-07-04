import { constructStorageURL } from './utils/helpers';

export const storageURL = 'https://omarlawatey-portfolio-storage.storage.googleapis.com';

export const PersonalInfo = {
  name: 'Omar Lawatey',
  username: 'omarlawatey',
  email: 'omarlawatey@gmail.com',
  github: 'https://github.com/omarlawaty',
  linkedIn: 'https://linkedIn.com/in/omarlawatey',
  photo: constructStorageURL('photo.jpg'),
  resume: constructStorageURL('resume.pdf'),
  locations: ['Giza, Egypt', 'Damietta, Egypt'],
};
