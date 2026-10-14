const { spawn } = require('child_process');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
(async () => {
  const port = 9404, profile = __dirname + '\\mprof_modal';
  const file = "file:///C:/Users/familia%20gidelu/Documents/Fluxo%20de%20Caixa/Fluxo%20de%20Caixa%20Cl%C3%A1ssico%20_%20Pai%20Rico_files/saved_resource(1).html?static=1";
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--allow-file-access-from-files','--window-size=900,500',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,file], { stdio: 'ignore' });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let ws, idc = 0; const pending = new Map();
  for (let i = 0; i < 90; i++) { await sleep(400); try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find(t => t.type === 'page'); if (p) { ws = new WebSocket(p.webSocketDebuggerUrl); break; } } catch (e) {} }
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise(res => { const id = ++idc;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evalJs = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.result.value; };
  await send('Page.enable');
  await send('Runtime.enable');
  await sleep(3500ортит);
  const chipVisible = await evalJs(`(() => { const c = document.getElementById('cflow-player-chip'); return !!c && c.offsetParent !== null && getComputedStyle(c).display !== 'none'; })()`);
  const modalHiddenInitially = await evalJs(`(() => { const m = document.getElementById('cflow-player-modal'); return m ? m.hidden === true : null; })()`);
  const modalDisplayInitially = await evalJs(`(() => { const m = document.getElementById('cflow-player-modal'); return m ? getComputedStyle(m).display : null; })()`);
  console.log('chip visivel:', chipVisible);
  console.log('modal hidden (atributo) no inicio:', modalHiddenInitially);
  console.log('modal display no inicio:', modalDisplayInitially);
  // clicar no chip
  await evalJs(`document.getElementById('cflow-player-chip').click(); true`);
  await sleep(500);
  const modalOpenedDisplay = await evalJs(`(() => { const m = document.getElementById('cflow-player-modal'); return getComputedStyle(m).display; })()`);
  console.log('modal display apos toque no chip:', modalOpenedDisplay);
  // digitar nome
  await evalJs(`(() => { const i = document.getElementById('cflow-player-input'); i.value = 'Maria'; i.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`);
  await sleep(300);
  await evalJs(`document.getElementById('cflow-player-ok').click(); true`);
  await sleep(500);
  const modalClosedHidden = await evalJs(`(() => { const m = document.getElementById('cflow-player-modal'); return m.hidden === true; })()`);
  const modalClosedDisplay = await evalJs(`(() => { const m = document.getElementById('cflow-player-modal'); return getComputedStyle(m).display; })()`);
  const chipLabel = await evalJs(`document.getElementById('cflow-player-chip').textContent`);
  const savedName = await evalJs(`localStorage.getItem('cflow_name')`);
  console.log('modal hidden apos Salvar:', modalClosedHidden);
  console.log('modal display apos Salvar:', modalClosedDisplay);
  console.log('chip label apos Salvar:', chipLabel);
  console.log('nome salvo no localStorage:', savedName);
  try { ws.close(); } catch (e) {} try { chrome.kill(); } catch (e) {}
  process.exit(0);
})().catch(e => { console.log('ERRO', e); process.exit(1); });