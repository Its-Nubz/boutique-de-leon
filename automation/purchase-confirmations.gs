/**
 * Boutique de Leon - automatic purchase request confirmations.
 * Uses the existing Formspree notification emails; no public web endpoint or
 * website changes are needed. Run setup() ONCE and authorize Gmail access.
 * New purchase notifications are checked approximately every five minutes.
 */
const BDL = {
  inbox: 'contact.boutiquedeleon@gmail.com',
  logo: 'https://raw.githubusercontent.com/Its-Nubz/boutique-de-leon/main/BDL%20Logo.png',
  query: 'to:contact.boutiquedeleon@gmail.com newer_than:7d',
  label: 'BDL / Confirmation Sent'
};

function setup() {
  if (Session.getEffectiveUser().getEmail().toLowerCase() !== BDL.inbox) {
    throw new Error('Sign into the boutique Gmail account before setup.');
  }
  const props = PropertiesService.getScriptProperties();
  props.setProperty('startMs', String(Date.now()));
  GmailApp.createLabel(BDL.label);
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'sendPurchaseConfirmations')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendPurchaseConfirmations').timeBased().everyMinutes(5).create();
}

function sendPurchaseConfirmations() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const start = Number(props.getProperty('startMs'));
    if (!start) throw new Error('Run setup() first.');
    const sentLabel = GmailApp.getUserLabelByName(BDL.label);
    if (!sentLabel) throw new Error('Confirmation label missing.');
    const threads = GmailApp.search(BDL.query, 0, 100);
    for (const thread of threads) {
      for (const message of thread.getMessages()) {
        if (message.getDate().getTime() < start) continue;
        const id = message.getId();
        if (props.getProperty('sent_' + id)) continue;
        const sender = message.getFrom().toLowerCase();
        // Only process Formspree notifications, never customer messages.
        if (!/formspree\.io/.test(sender)) continue;
        const subject = message.getSubject();
        const body = message.getPlainBody();
        if (!/purchase request/i.test(subject + '\n' + body)) continue;
        const fields = parseFields(body);
        const email = fields.email || fields['email address'];
        const product = fields.product || fields.item;
        const name = fields.name;
        if (!email || !product || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          console.warn('Unrecognized purchase notification format; skipping message ' + id);
          continue;
        }
        if (email.toLowerCase() === BDL.inbox) continue;
        const safe = escapeHtml;
        const html = '<div style="background:#101010;padding:30px 15px;font-family:Arial,sans-serif">' +
          '<div style="max-width:560px;margin:auto;background:#191919;color:#f5f1e8;padding:28px;border:1px solid #9c793c">' +
          '<div style="text-align:center"><img src="' + BDL.logo + '" alt="Boutique de Leon" style="max-width:160px;width:50%;height:auto">' +
          '<h2 style="color:#d7b56d">Purchase Request Received</h2></div>' +
          '<p>Hi ' + safe(name) + ',</p>' +
          '<p>Thank you! Your purchase request for <strong>' + safe(product) + '</strong> has been submitted.</p>' +
          '<p>Accepted payment methods: <strong>Cash, Zelle, Venmo, and Cash App.</strong></p>' +
          '<p>Boutique de Leon will contact you using your preferred contact method to confirm availability and arrange a pickup date, time, and location in Carson City, NV.</p>' +
          '<p style="font-size:12px;color:#c6c0b4">No payment has been processed and your item is not reserved yet.</p>' +
          '<p style="color:#d7b56d">Boutique de Leon</p></div></div>';
        GmailApp.sendEmail(email, 'Boutique de Leon | Purchase Request Received',
          'Hi ' + name + ', your purchase request for ' + product +
          ' has been submitted. Accepted payments: Cash, Zelle, Venmo, Cash App. ' +
          'Boutique de Leon will contact you using your preferred method to confirm availability and arrange pickup in Carson City, NV. ' +
          'No payment has been processed and the item is not yet reserved.',
          {htmlBody: html, name: 'Boutique de Leon', replyTo: BDL.inbox});
        props.setProperty('sent_' + id, String(Date.now()));
        thread.addLabel(sentLabel);
      }
    }
  } finally { lock.releaseLock(); }
}

function parseFields(body) {
  const fields = {};
  // Supports "field: value" and "field\nvalue" styles of Formspree notices.
  const lines = body.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const names = /^(name|email|email address|product|item|inquiry_type|payment_method|preferred_contact_method)$/i;
  for (let i=0;i<lines.length;i++) {
    const m = lines[i].match(/^([\w ]+):\s*(.+)$/);
    if (m) fields[m[1].trim().toLowerCase()] = m[2].trim();
    else if (names.test(lines[i]) && lines[i+1]) fields[lines[i].toLowerCase()] = lines[i+1];
  }
  return fields;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
