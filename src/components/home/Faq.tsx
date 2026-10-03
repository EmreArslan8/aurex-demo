const ITEMS = [
  ["Fiyatlar neden sürekli değişiyor?", "Ürün fiyatlarımız altın ve gümüş piyasasına bağlıdır. Piyasa hareket ettikçe fiyatlar da anlık güncellenir; ödeme adımında fiyatınız kısa bir süre sabitlenir, böylece sürpriz yaşamazsınız."],
  ["Ürünler orijinal mi, nasıl anlarım?", "Her külçe ve sikke benzersiz bir seri numarası ve QR kodlu sertifikayla gönderilir. QR kodu telefonunuzla okutarak ya da seri numarasını “Sertifika Doğrula” sayfasına yazarak ürününüzü anında kontrol edebilirsiniz."],
  ["Kargo güvenli mi?", "Tüm gönderiler ürün değeri üzerinden sigortalanır, mühürlü ve isimsiz paketle teslim edilir. Teslimatta kimlik kontrolü yapılır."],
  ["Ödeme güvenli mi?", "Ödemeler BDDK lisanslı banka altyapısı ve 3D Secure doğrulamasıyla alınır. Kart bilgileriniz Aurex sunucularında saklanmaz."],
  ["Aldığım altını geri satabilir miyim?", "Evet. Ürünlerinizi güncel geri alım fiyatından Aurex’e satabilirsiniz; geri alım fiyatı her ürün sayfasında ve mobil uygulamadaki portföyünüzde anlık görünür."],
];

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-surface">
      {ITEMS.map(([q, a]) => (
        <details key={q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {q}
            <span className="text-h3 text-gold transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-small text-ink-2">{a}</p>
        </details>
      ))}
    </div>
  );
}
