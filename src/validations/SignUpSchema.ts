import * as Yup from 'yup';

export default Yup.object({
  firstName: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
  phoneNumber: Yup.string()
    .length(18, 'Phone length')
    .required('Required field')
    .test(
      'phoneNumber',
      'Invalid Phone',
      (phoneNumber?: string | null) => {
        //Telefon kontrol eklenecek
       return true;
      },
    ),
  eMail: Yup.string()
    .email('Invalid mail')
    .matches(/^[^çğöşüÇĞÖŞÜıİ]*$/g, 'Invalid mail')
    .required('Required field'),
});
