# 簡訊實聯制研究原始資料

中央研究院法律學研究所資訊法中心[〈簡訊實聯制觀察筆記〉](https://infolaw.iias.sinica.edu.tw/?tag=%e7%b0%a1%e8%a8%8a%e5%af%a6%e8%81%af%e5%88%b6)系列文章原始研究資料。

## `1922.csv`

衛福部疾管署「[簡訊實聯制 – 民眾資料調閱紀錄查詢服務](https://sms.1922.gov.tw)」網頁下方橫幅的統計數字[^frequency-1922]歷史紀錄：

[^frequency-1922]: 橫幅資料原則上每日更新一次，但偶有缺漏情形。

* 前日刪除筆數（含台北通）
* 累積刪除筆數（含台北通）
* 累積調閱筆數
* 資料更新時間

**資料範圍：**​自 2021/11/18 開始蒐集資料[^start-date]，至 2022/5/27 資料不再更新[^cease-update]為止。

[^start-date]: 2021/11/18 是研究者開始蒐集資料的日期，該網頁何時開始提供統計數字目前尚無公開資訊。
[^cease-update]: 簡訊實聯制於 2022/4/27 停止使用，最後一日的資料理應於 2022/5/27 屆滿 28 天而刪除。

11/18–12/13 部分為人工紀錄，每日紀錄一次。

12/14 起導入 Google App Script 自動抓取資料，以每日三次至每兩小時一次的頻率自 1922 疫調平台網頁的 API 端點讀取統計數字。如果當天更新的第一筆資料與後續的不一致，程式便會紀錄當天後續每一次請求的結果、無論是否與其中任何一筆重複。

因部分日期資料來源未更新或更新一次以上，日期並非連續或唯一，惟資料係依抓取順序升冪排列。

**參考閱讀：**[簡訊實聯制觀察筆記（二）：統計資料來源比較與開放性問題](https://infolaw.iias.sinica.edu.tw/?p=5002)、[簡訊實聯制觀察筆記（三）：用量變化因素與裁罰爭議](https://infolaw.iias.sinica.edu.tw/?p=5029)。

## `script.gs`

用以自動化抓取資料的 Google App Script 程式原始碼。

```sh
curl "https://sms.1922.gov.tw/map/user/people/clear_count"
```

```json
{"Result":1,"Data":{"alldaycnt":7701371,"allsumcnt":4786676508,"allqryrowcnt":42845907,"yyyymmdd":"20220526","updatetime":"2022-05-27T09:59:15.503"},"Message":"成功"}
```

## `ncc_sent.csv`、`ncc_deleted.csv`

國家通訊傳播委員會 (NCC) 於 2021/6/28 起陸續以字卡形式公布[^frequency-NCC]在其[臉書粉絲專頁](https://www.facebook.com/ncc.gov.tw/photos/)的簡訊實聯制統計數字。此處僅將粉絲專頁字卡之統計數字整理成易於處理的開放格式，兩檔案分別包含：

* 發送（刪除）統計期間末日
* 累積發送（刪除）簡訊則數

[^frequency-NCC]: NCC 原則上每週發布一次統計，但偶有缺漏情形。

**資料範圍：**​自 2021/6/28 首次發布統計，至 2022/5/27 最後一次發布統計為止。

統計期間始日均為 2021/5/19。

**參考閱讀：**[簡訊實聯制觀察筆記（一）：法規背景與使用趨勢](https://infolaw.iias.sinica.edu.tw/?p=4981)。
