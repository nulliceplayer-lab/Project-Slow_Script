document.getElementById("Youtube-Downloader").addEventListener("click", (e) => {
  // 対策3: 元のページの予期せぬリロードや遷移を防ぐ
  e.preventDefault();

  // 対策1: 最初にウィンドウを開く
  const newWindow = window.open("about:blank", "_blank");

  if (!newWindow) {
    alert(
      "ポップアップがブロックされました。ブラウザの設定で許可してください。"
    );
    return;
  }

  // 対策2: テンプレートリテラル内の「${}」が外側で誤評価されないよう、
  // 内側の「$」を「\$」にエスケープするか、文字列を分離します。
  const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube Downloader</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <style>
    body { background: linear-gradient(135deg, #0f172a, #1e2937); }
  </style>
</head>
<body class="min-h-screen text-white">
  <div class="max-w-2xl mx-auto pt-16 px-4">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-2">
        <i class="fab fa-youtube text-red-500"></i> YT Downloader
      </h1>
      <p class="text-gray-400">YouTube動画を簡単にダウンロード</p>
    </div>

    <div class="bg-slate-900 rounded-2xl p-8 shadow-2xl">
      <div class="mb-6">
        <label class="block text-sm mb-2 text-gray-400">YouTube URLを貼り付けてください</label>
        <div class="flex gap-3">
          <input 
            type="text" 
            id="urlInput"
            placeholder="https://www.youtube.com/watch?v=..."
            class="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 focus:outline-none focus:border-red-500 transition">
          <button 
            onclick="getVideoInfo()"
            class="bg-red-600 hover:bg-red-700 px-8 rounded-xl font-medium transition">
            解析
          </button>
          <p style="color:#373738">注意:このサイトだけではなく、他のサイトにジャンプします。</p>
        </div>
      </div>

      <div id="videoInfo" class="hidden">
        <div class="flex gap-6">
          <img id="thumbnail" class="w-48 rounded-xl" alt="thumbnail">
          <div class="flex-1">
            <h2 id="title" class="text-xl font-semibold leading-tight mb-3"></h2>
            <p id="channel" class="text-gray-400"></p>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-4">
          <button onclick="downloadVideo('mp4')" class="bg-emerald-600 hover:bg-emerald-700 p-6 rounded-2xl text-left transition group">
            <div class="flex items-center gap-4">
              <i class="fas fa-video text-3xl"></i>
              <div>
                <div class="font-semibold text-lg">動画 (MP4)</div>
                <div class="text-emerald-300 text-sm">最高画質</div>
              </div>
            </div>
          </button>

          <button onclick="downloadVideo('mp3')" class="bg-sky-600 hover:bg-sky-700 p-6 rounded-2xl text-left transition group">
            <div class="flex items-center gap-4">
              <i class="fas fa-music text-3xl"></i>
              <div>
                <div class="font-semibold text-lg">音声のみ (MP3)</div>
                <div class="text-sky-300 text-sm">高音質</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    function extractVideoId(url) {
      const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }

    async function getVideoInfo() {
      const url = document.getElementById('urlInput').value.trim();
      const videoId = extractVideoId(url);

      if (!videoId) {
        alert("正しいYouTubeのURLを入力してください！");
        return;
      }

      const infoDiv = document.getElementById('videoInfo');
      const thumbnail = document.getElementById('thumbnail');
      const title = document.getElementById('title');
      const channel = document.getElementById('channel');

      // エスケープを回避するため、文字列結合に変更
      thumbnail.src = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";

      try {
        const res = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + videoId + "&format=json");
        const data = await res.json();
        title.textContent = data.title;
        channel.textContent = data.author_name;
      } catch(e) {
        title.textContent = "YouTube Video";
        channel.textContent = "Unknown Channel";
      }

      infoDiv.classList.remove('hidden');
      infoDiv.scrollIntoView({ behavior: "smooth" });
    }

    function downloadVideo(type) {
      const url = document.getElementById('urlInput').value.trim();
      const videoId = extractVideoId(url);

      if (!videoId) return;

      let downloadUrl = '';
      if (type === 'mp4') {
        downloadUrl = "https://loader.to/api/button/?url=https://www.youtube.com/watch?v=" + videoId + "&text=MP4";
      } else {
        downloadUrl = "https://loader.to/api/button/?url=https://www.youtube.com/watch?v=" + videoId + "&text=MP3";
      }

      window.open(downloadUrl, '_blank');
    }

    document.getElementById('urlInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') getVideoInfo();
    });
  </script>
</body>
</html>
  `;

  newWindow.document.open();
  newWindow.document.write(htmlContent);
  newWindow.document.close();
});
