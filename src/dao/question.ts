import { iQuestion } from "./question.interface";
class Question {
  public question: iQuestion[] = [
    {
      question: "Dari antara pasien yang berkonsultasi dengan Dokter, berapa banyak yang memiliki riwayat lahir sesar?",
      listAnswer: [
        { key: "a", value: "< 5 pasien" },
        { key: "b", value: "5-10 pasien" },
        { key: "c", value: "10 pasien" },
        { key: "d", value: "Tidak ada" },
      ],
      answer: null,
    },
    {
      question: "Menurut Dokter apakah ada kebutuhan intervensi nutrisi khusus untuk anak yang lahir secara C-Section?",
      listAnswer: [
        { key: "a", value: "Butuh, kalau tidak mendapatkan ASI" },
        { key: "b", value: "Butuh, terlepas mendapat ASI atau tidak" },
        { key: "c", value: "Tidak dibutuhkan, terlepas mendapat ASI atau tidak" },
      ],
      answer: null,
    },
    {
      question: "Menurut Dokter, intervensi nutrisi jenis apa yang dibutuhkan untuk anak yang lahir secara C-Section?",
      listAnswer: [
        { key: "a", value: "Sinbiotik (Kombinasi prebiotic & probiotik)" },
        { key: "b", value: "Probiotik saja" },
        { key: "c", value: "Prebiotik saja" },
        { key: "d", value: "Tidak Butuh" },
        { key: "e", value: "Lainnya…" },
      ],
      answer: null,
    },
    {
      question:
        "Menurut Dokter, jenis formula apa yang paling sesuai untuk anak yang lahir secara C-section dan belum beruntung mendapatkan ASI?",
      listAnswer: [
        { key: "a", value: "Formula standar tanpa tambahan nutrisi khusus" },
        { key: "b", value: "Formula Standar dengan tambahan prebiotik, probiotik, atau sinbiotik" },
        { key: "c", value: "Formula PHP tanpa tambahan nutrisi khusus" },
        { key: "d", value: "Formula PHP dengan tambahan prebiotik, probiotik, atau sinbiotik" },
        { key: "e", value: "Formula terhidrolisa ekstensif" },
        { key: "f", value: "Lainnya…." },
      ],
      answer: null,
    },
    {
      question:
        "Menurut Dokter, jenis formula apa yang paling sesuai untuk anak yang lahir secara C-section dan belum beruntung mendapatkan ASI?",
      listAnswer: [
        { key: "a", value: "Formula standar tanpa tambahan nutrisi khusus" },
        { key: "b", value: "Formula Standar dengan tambahan prebiotik, probiotik, atau sinbiotik" },
        { key: "c", value: "Formula PHP tanpa tambahan nutrisi khusus" },
        { key: "d", value: "Formula PHP dengan tambahan prebiotik, probiotik, atau sinbiotik" },
        { key: "e", value: "Formula terhidrolisa ekstensif" },
        { key: "f", value: "Lainnya…." },
      ],
      answer: null,
    },
    {
      question: "Apa komposisi dari SYNEOR?",
      listAnswer: [
        { key: "a", value: "SYNEO adalah prebiotik lcFOS:scGOS 1:9 yang 5x lebih tinggi" },
        { key: "b", value: "SYNEO adalah protein yang lebih tinggi" },
        {
          key: "c",
          value:
            "SYNEO adalah gabungan unik antara prebiotik lcFOS:scGOS 1:9 dan probiotik B Breve M16V yang 5X lebih tinggi",
        },
        { key: "d", value: "SYNEO merupakan kombinasi khusus untuk perkembangan kecerdasan anak." },
      ],
      answer: "c",
    },
    {
      question: "SYNEOR Terbukti Klinis untuk ….",
      listAnswer: [
        {
          key: "a",
          value: "Membantu Kolonisasi Mikrobiota Saluran Cerna untuk Dukung Sistem Imun Anak yang lahir cesar",
        },
        { key: "b", value: "Memperlambat Kolonisasi Mikrobiota saluran cerna untuk menjaga keseimbangan sistem imun." },
        {
          key: "c",
          value:
            "Meningkatkan jumlah bakteri menguntungkan pada saluran cerna dan meningkatkan kejadian dermatitis atopic",
        },
        {
          key: "d",
          value:
            "Mencegah terjadinya kolonisasi microbiota normal usus yang berlebih dan menurunkan kejadian alergi pada anak.",
        },
      ],
      answer: "a",
    },
    {
      question: "Nutribaby Royal+ Cesabio….",
      listAnswer: [
        {
          key: "a",
          value: "Formula terhidrolisa ekstensif untuk membantu mengatasi kejadian dan gejala alergi susu sapi.",
        },
        {
          key: "b",
          value:
            "Formula pertama yang diformulasikan khusus untuk dukung sistem imun dan perkembangan kognitif anak yang lahir cesar.",
        },
        { key: "c", value: "Formula yang diformulasikan khusus untuk mencegah terjadinya alergi pada anak." },
        {
          key: "d",
          value: "Formula yang terbukti klinis mencegah terjadinya alergi dan infeksi berkepanjangan pada anak.",
        },
      ],
      answer: "b",
    },
  ];
}

export default new Question();
