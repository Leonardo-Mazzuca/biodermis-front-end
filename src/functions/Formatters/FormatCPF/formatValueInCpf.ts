
export const formatInCPF = (value: string) => {

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

}
export const formatFieldValueInCpf = (value: string) => {

    value = value.replace(/\D/g, "");
  
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };