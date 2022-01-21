export default {
  change: redirect => {
    const currentTheme = localStorage.getItem('theme') ?? 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(localStorage.getItem('theme'));
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    redirect.preventDefault();
  },
  update: () => {
    document.body.classList.add(localStorage.getItem('theme'));
  },
};
