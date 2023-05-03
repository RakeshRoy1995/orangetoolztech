export const formatError = (msg: string) => ({
    errors: [
        {
            msg,
        },
    ],
});

export const formatSuccess = (data: any) => ({
  success:true , data
});


export const  formatPhoneNumber = (phoneNumberString:any) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}


export const  uniqueArrayBaseOnPhoneNumber = (data:any) => {
    // Create a Set of unique values based on a phone field
    let uniqueSet = new Set(
        data.map((item: any) => item.phone)
      );

      // Create an array of unique objects based on the phone field
      return  [...uniqueSet].map((phone) => {
        return data.find((item: any) => item.phone === phone);
      });
}
