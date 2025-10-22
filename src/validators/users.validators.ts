export function userValidator(user): boolean {
  let check: boolean = true;
  if (typeof user.dni != 'number' || user.dni <= 999999 || !user.dni) {
    check = false;
  }
  if (typeof user.name != 'string' || user.name.length < 3 || !user.name) {
    check = false;
  }
  if (
    typeof user.lastName != 'string' ||
    user.lastName.length < 3 ||
    !user.lastName
  ) {
    check = false;
  }

  return check;
}
