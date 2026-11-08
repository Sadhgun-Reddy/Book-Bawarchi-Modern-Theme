export const getPasswordStrength = (pass: string) => {
  if (pass.length === 0) return { score: 0, label: '', color: 'bg-stone-200', textClass: '' };
  if (pass.length < 6)
    return { score: 1, label: 'Weak', color: 'bg-red-500', textClass: 'text-red-500' };
  if (pass.length < 8 || !/\d/.test(pass))
    return { score: 2, label: 'Fair', color: 'bg-yellow-500', textClass: 'text-yellow-600' };
  return { score: 3, label: 'Strong', color: 'bg-green-500', textClass: 'text-green-600' };
};
