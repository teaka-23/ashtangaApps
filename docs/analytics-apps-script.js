/**
 * Upsert по visitorId: одна строка на анонимного пользователя.
 * Лист Users — см. docs/analytics.md
 *
 * Принимает GET (?payload=...) и POST (text/plain JSON) —
 * браузерный POST у Apps Script часто ломается на редиректе.
 *
 * После правок: Deploy → Manage deployments → Edit → New version.
 */

var COL = {
  visitorId: 1,
  firstSeen: 2,
  lastSeen: 3,
  lastPlatform: 4,
  platforms: 5,
  appSec: 6,
  practiceSec: 7,
  appOpens: 8,
  practiceOpens: 9,
  lastScreen: 10,
  lastSeries: 11,
};

function doGet(e) {
  try {
    var raw = (e && e.parameter && e.parameter.payload) || '';
    if (!raw) {
      return json_({ ok: true, ping: true });
    }
    upsertVisitor_(JSON.parse(raw));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    upsertVisitor_(data);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function upsertVisitor_(data) {
  var visitorId = String(data.visitorId || '').trim();
  if (!visitorId) throw new Error('visitorId required');

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  if (!sheet) throw new Error('sheet Users not found');

  var kind = data.kind === 'practice' ? 'practice' : 'app';
  var duration = Math.max(0, Number(data.durationSec) || 0);
  var platform = String(data.platform || '');
  var endedAt = data.endedAt ? new Date(data.endedAt) : new Date();
  var startedAt = data.startedAt ? new Date(data.startedAt) : endedAt;
  var screen = String(data.screen || '');
  var seriesId = String(data.seriesId || '');

  var row = findVisitorRow_(sheet, visitorId);
  if (!row) {
    sheet.appendRow([
      visitorId,
      startedAt,
      endedAt,
      platform,
      platform,
      kind === 'app' ? duration : 0,
      kind === 'practice' ? duration : 0,
      kind === 'app' ? 1 : 0,
      kind === 'practice' ? 1 : 0,
      screen,
      seriesId,
    ]);
    return;
  }

  var appSec = Number(sheet.getRange(row, COL.appSec).getValue()) || 0;
  var practiceSec = Number(sheet.getRange(row, COL.practiceSec).getValue()) || 0;
  var appOpens = Number(sheet.getRange(row, COL.appOpens).getValue()) || 0;
  var practiceOpens =
    Number(sheet.getRange(row, COL.practiceOpens).getValue()) || 0;
  var platforms = String(sheet.getRange(row, COL.platforms).getValue() || '');

  if (kind === 'app') {
    appSec += duration;
    appOpens += 1;
  } else {
    practiceSec += duration;
    practiceOpens += 1;
  }

  platforms = mergePlatforms_(platforms, platform);

  sheet.getRange(row, COL.lastSeen).setValue(endedAt);
  sheet.getRange(row, COL.lastPlatform).setValue(platform);
  sheet.getRange(row, COL.platforms).setValue(platforms);
  sheet.getRange(row, COL.appSec).setValue(appSec);
  sheet.getRange(row, COL.practiceSec).setValue(practiceSec);
  sheet.getRange(row, COL.appOpens).setValue(appOpens);
  sheet.getRange(row, COL.practiceOpens).setValue(practiceOpens);
  sheet.getRange(row, COL.lastScreen).setValue(screen);
  if (seriesId) sheet.getRange(row, COL.lastSeries).setValue(seriesId);
}

function findVisitorRow_(sheet, visitorId) {
  var last = sheet.getLastRow();
  if (last < 2) return null;
  var values = sheet.getRange(2, COL.visitorId, last, COL.visitorId).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === visitorId) return i + 2;
  }
  return null;
}

function mergePlatforms_(existing, platform) {
  if (!platform) return existing;
  var set = {};
  String(existing || '')
    .split(',')
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean)
    .forEach(function (p) {
      set[p] = true;
    });
  set[platform] = true;
  return Object.keys(set).sort().join(',');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
