document.getElementById("openBtn").addEventListener("click", () => {
  const newWindow = window.open("about:blank", "_blank");

  if (newWindow) {
    const htmlContent = `
            <!DOCTYPE html>
            <html lang="ja">
            <head>
                <meta charset="UTF-8">
                <title>about:blankの中に作ったページ</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; background: #f0f2f5; text-align: center; }
                    .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; }
                    h1 { color: #1a73e8; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Slow_scriptへようこそ！</h1>
                    <p>Slow_scriptはabout:blankを経由して<b>履歴に残さない</b>ツールサイトです。</p>
                    <p>さっそくですがYoutube見たいですよね？そんなあなたには<b>Youtubeダウンローダー</b>を使いましょう。YoutubeダウンローダーはYoutubeのリンクを打つだけでなんとYoutubeの動画が見れます！ですが、ブロックツールがダウンロードを妨害する可能性があります。</p>
                    <button id="Youtube-Downloader">Youtubeダウンローダーへ</button>
                    <script src="https://m59qxx.csb.app/YoutubeDLR.js"></script>
                </div>
            </body>
            </html>
        `;

    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  }
});
