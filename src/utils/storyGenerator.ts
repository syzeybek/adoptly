// src/utils/storyGenerator.ts

export const generateUniqueStory = (name: string = "Bu tatlı dostumuz"): string => {
  // Tamamen doğal Türkçeye uygun, duygu yüklü ve eşsiz hikaye şablonları
  const stories = [
    "{name}, sokakların zorlu şartlarından kurtarılıp sevgi dolu bir yuva arayışına girdi. İlk başlarda biraz utangaç olsa da, güvenini kazandığınızda size tüm kalbini açacaktır. Özellikle akşamları yanınızda kıvrılıp uyumaya bayılır.",
    
    "Enerjisi ve neşesiyle girdiği her ortama ışık saçan {name}, tam bir oyun delisi! Eğer onunla koşup oynayacak, enerjisine ayak uyduracak bir aile arıyorsanız, aradığınız dost tam karşınızda duruyor.",
    
    "Sessiz, sakin ve tam bir sevgi pıtırcığı... {name}, hayatının geri kalanını huzurlu bir evde, cam kenarında dışarıyı izleyerek ve bolca sevilerek geçirmek istiyor. Onun o masum bakışlarına karşı koymak inanın çok zor.",
    
    "Geçmişte yaşadığı zorluklara rağmen insanlara olan inancını asla kaybetmemiş bir kahraman o. {name}, sadece ona hak ettiği şefkati gösterecek ve onu ailenin bir parçası yapacak o özel insanı bekliyor.",
    
    "Eğer evinizde eksik olan şeyin bolca kucaklaşma ve koşulsuz sevgi olduğunu düşünüyorsanız, {name} bu boşluğu doldurmak için hazır bekliyor. Mamasını yedikten sonra göbeğini sevdirme ritüeli onun en büyük hobisi!",
    
    "Zeki, meraklı ve öğrenmeye her zaman açık! {name}, yeni numaralar öğrenmeye ve sizinle uzun yürüyüşlere çıkmaya can atıyor. Hem bedensel hem de zihinsel olarak aktif kalmayı seven harika bir yol arkadaşı.",
    
    "{name} ile tanıştığınızda onun ne kadar nazik ve duygusal bir ruha sahip olduğunu hemen anlayacaksınız. Kalabalık ve gürültülü ortamlardan ziyade, baş başa geçireceğiniz sakin akşamların hayalini kuruyor.",
    
    "Biraz şımarık, çokça sevimli! {name}, evin neşesi olmaya aday. İlgiyi kendi üzerinde toplamayı çok iyi biliyor ve size hayatın stresini unutturacak o eşsiz enerjiyi fazlasıyla taşıyor.",
    
    "Küçük patileriyle kalbinizde kocaman bir yer edinecek olan {name}, uysal doğasıyla dikkat çekiyor. Daha önce bir evcil hayvan tecrübeniz yoksa bile, onun bu uyumlu yapısı size harika bir başlangıç sunacaktır.",
    
    "{name}, gözlerinizin içine bakarak sizinle adeta konuşabilen nadir dostlardan biri. Sizi kapıda kuyruk sallayarak veya tatlı mırıltılarla karşılayacak, evinize gerçek anlamda 'yuva' sıcaklığını getirecek bir can yoldaşı.",
    
    "O, küçük bedeninde aslan gibi cesur bir yürek taşıyor! {name}, ailesini koruyup kollamayı görev edinmiş, inanılmaz sadık bir dost. Onunla kuracağınız bağın ömür boyu kopmayacağına emin olabilirsiniz.",
    
    "Eğer 'Bana sadece sevgi versin, başka bir şey istemem' diyorsanız {name} tam size göre. Onun dünyası sadece sevmek ve sevilmek üzerine kurulu. Sıcacık bir kucak onun için dünyanın en güvenli yeri."
  ];

  // Havuzdan rastgele bir hikaye seçiyoruz
  const randomIndex = Math.floor(Math.random() * stories.length);
  const selectedStory = stories[randomIndex];

  // Şablondaki "{name}" kısımlarını, fonksiyona gelen gerçek isimle değiştiriyoruz
  return selectedStory.replace(/{name}/g, name);
};