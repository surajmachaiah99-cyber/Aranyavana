/* Udyana — form.js
 * Validate + submit the enquiry form to /api/enquire.
 */

(() => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const endpoint = '/api/enquire';

  const setStatus = (msg, kind = '') => {
    status.textContent = msg;
    status.classList.remove('is-error', 'is-success');
    if (kind === 'error') status.classList.add('is-error');
    if (kind === 'success') status.classList.add('is-success');
  };

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      name: (fd.get('name') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      phone: (fd.get('phone') || '').toString().trim(),
      message: (fd.get('message') || '').toString().trim(),
    };

    if (!payload.name) {
      setStatus('Please share your name.', 'error');
      form.name.focus();
      return;
    }
    if (!isEmail(payload.email)) {
      setStatus('A valid email helps us reply.', 'error');
      form.email.focus();
      return;
    }
    if (payload.message.length < 4) {
      setStatus('A line or two about what brings you here.', 'error');
      form.message.focus();
      return;
    }

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    setStatus('Sending your enquiry…');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data = {};
      try { data = await res.json(); } catch { /* tolerate non-JSON */ }

      if (!res.ok || data.error) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      form.reset();
      setStatus('Thank you. We will write to you within two working days.', 'success');
    } catch (err) {
      setStatus(
        'We could not reach the server. Please email hello@aranyavana.com directly.',
        'error'
      );
      console.error('[enquiry] submit failed:', err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
