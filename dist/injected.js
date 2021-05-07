(function() {
  'use strict';

  window.DDRSADiff = {};
  DDRSADiff.diffOn = false;
  DDRSADiff.origBuildScoreTr = window.buildScoreTr;
  DDRSADiff.diffBuildScoreTr = function(dIndex, sMusic, dSequence, dRank, dsScore, ddFc, dStyle) {
    let sTr, sTdRank, sTdScore, i;

    sTdRank = '';
    if (2 <= dsScore.length) {
      if (dsScore[0] == '-') {
        dRank = '-';
      }
      sTdRank = '<td>' + dRank + '</td>';
    }

    const myNum = Number(dsScore[0].replace(/,/g, ''));

    sTdScore = '<td class="' + g['dsFcClass'][ddFc[0]] + '">' + dsScore[0] + '</td>';
    for (i = 1; i < dsScore.length; i++) {
      if (dsScore[i] == '-') {
        sTdScore += '<td class="' + g['dsFcClass'][ddFc[i]] + '">-</td>';
      }
      else if (dsScore[0] == '-') {
        sTdScore += '<td class="' + g['dsFcClass'][ddFc[i]] + '">' + dsScore[i] + '</td>';
      }
      else {
        const targetNum = Number(dsScore[i].replace(/,/g, ''));
        const diff = targetNum - myNum;
        const sign =  diff > 0  ? '+'
                    : diff == 0 ? '+-'
                    :             '';
        const style = diff > 0 ? ' style="color: #00a;"'
                    : diff < 0 ? ' style="color: #a00;"'
                    :            '';
        sTdScore += '<td class="' + g['dsFcClass'][ddFc[i]] + '"' + style + '>' + sign + diff.toLocaleString() + '</td>';
      }
    }

    sTr = '<tr>' +
          '<td>' + dIndex + '</td>' +
          '<td class="music"><a class="text" href="music.php?index=' + dIndex + '">' + sMusic + '</a></td>' +
          '<td><a class="text ' + g['dsSequenceClass'][dSequence] + '" href="music.php?index=' + dIndex + '&style=' + dStyle + '&sequence=' + dSequence + '">' + g['dsSequence'][dSequence] + '</td>' +
          sTdRank +
          sTdScore +
          '</tr>';

    return sTr;
  };

  DDRSADiff.origRewriteScore = window.rewriteScore;
  DDRSADiff.latestRewriteScoreArgs = [];
  window.rewriteScore = function(...args) {
    DDRSADiff.latestRewriteScoreArgs = args;
    DDRSADiff.origRewriteScore(...args);
  };

  document.body.addEventListener('dblclick', function (e) {
    DDRSADiff.diffOn = ! DDRSADiff.diffOn;
    window.buildScoreTr = DDRSADiff.diffOn
      ? DDRSADiff.diffBuildScoreTr
      : DDRSADiff.origBuildScoreTr;
    rewriteScore(...DDRSADiff.latestRewriteScoreArgs);
  });
})();
