document.getElementById('add-link').addEventListener('click', () => {
  const a = document.createElement('a');
        const link = document.createTextNode('Title');
        a.appendChild(link);
        a.title = 'New Button';
        a.href = 'https://www.facebook.com';
        document.getElementById('one').appendChild(a);
});