export default {
  change: redirect => {
    const newTheme = localStorage.getItem('theme') === 'light' ? 'dark' : localStorage.getItem('theme') === null ? 'dark' : 'light';
    document.body.classList.remove(localStorage.getItem('theme'));
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    redirect.preventDefault();
  },
  update: () => {
    document.body.classList.add(localStorage.getItem('theme'));
  },
};
