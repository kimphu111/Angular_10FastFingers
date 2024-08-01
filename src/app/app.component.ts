import { style } from '@angular/animations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'first_project';
  point: number = 0;
  totalTime: number = 60;
  time: number = 0;
  input: string = '';
  randomWord: string = '';
  currentWord: number = 0;
  gameStarted: boolean = false;
  word: string = '';
  pressKey: string = '';
  activeKey: string = '';

  buttons = [
    { top: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] },
    { mid: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] },
    { bot: ['z', 'x', 'c', 'v', 'b', 'n', 'm'] },
  ];

 myWord: string[] = [
  'nhà', 'trường', 'học', 'công việc', 'giờ', 'người', 'cuộc sống', 'đi', 'nói', 
  'việc', 'yêu', 'sống', 'bạn', 'tôi', 'năm', 'ngày', 'mùa', 'tháng', 'tuần',
  'đường', 'sách', 'bút', 'máy', 'xe', 'nhạc', 'bữa', 'cơm', 'ngủ', 'chơi',
  'hơi', 'nắng', 'mưa', 'gió', 'mát', 'lạnh', 'ấm', 'làm', 'chạy', 'ngồi',
  'mua', 'bán', 'học', 'đọc', 'viết', 'hát', 'nhảy', 'vui', 'buồn', 'giận',
  'mệt', 'sáng', 'tối', 'trưa', 'chiều', 'sớm', 'khuya', 'rẻ', 'đắt', 'nhanh',
  'chậm', 'đẹp', 'xấu', 'dài', 'ngắn', 'cao', 'thấp', 'lớn', 'nhỏ', 'rộng',
  'hẹp', 'tốt', 'xấu', 'sạch', 'bẩn', 'mới', 'cũ', 'đang', 'kết thúc', 'bắt đầu',
  'đầu', 'cuối', 'trước', 'sau', 'trên', 'dưới', 'trái', 'phải', 'cửa', 'nhẫn',
  'đồng', 'bạc', 'vàng', 'sắt', 'kẽm', 'gỗ', 'kim', 'màu', 'sáng', 'tối',
  'tính', 'tình', 'công', 'dân', 'bác', 'chị', 'em', 'anh', 'chị', 'bà', 
  'ông', 'cô', 'chú', 'mẹ', 'bố', 'con', 'mẹ', 'cha', 'bạn', 'kết', 'lạc',
  'hành', 'đề', 'trận', 'khách', 'chủ', 'nghiệp', 'công việc', 'thực', 'hành',
  'vận', 'phát', 'kế', 'hệ', 'lý', 'số', 'công', 'hoạt', 'hình', 'nhóm', 'đám',
  'lớp', 'tổ', 'thực', 'bệnh', 'dịch', 'ngành', 'sở', 'tổ', 'hội', 'môn', 'câu',
  'đề', 'vấn', 'điều', 'tốt', 'hội', 'nghị', 'khảo', 'bài', 'dự', 'bước', 'bài',
  'kiểm', 'đại', 'dự', 'điểm', 'kỳ', 'điểm', 'nhất', 'hết', 'mới', 'xem', 'thư',
  'dự', 'dạy', 'học', 'nghe', 'hiểu', 'thực', 'chứng', 'học', 'cảm', 'bài', 'nhỏ',
  'lớn', 'chính', 'ngành', 'công', 'văn', 'năm', 'mới', 'cũ', 'sinh', 'học', 'bổ',
  'trí', 'sáng', 'sáng', 'điều', 'thành', 'năm', 'quá', 'mỗi', 'tuổi', 'khoản',
  'thực', 'cụ', 'phương', 'tiến', 'khoa', 'đề', 'khuyến', 'sự', 'hướng', 'hướng',
  'kỹ', 'nghiệp', 'công', 'đáp', 'khuyến', 'cầu', 'đại', 'phẩm', 'chí', 'giao', 
  'tự', 'từng', 'khoảng', 'sao', 'giao', 'báo', 'nhìn', 'chờ', 'thường', 'nói'
];

  checkInput() {
    if (this.randomWord == this.input) {
      this.point++;
    } else {
      this.point = Math.max(0, this.point - 1);
    }
    this.input;
    this.setRandomWord();
  }



  setRandomWord() {
    this.randomWord =
      this.myWord[Math.floor(Math.random() * this.myWord.length)];
    this.currentWord = Date.now();
    this.word = this.randomWord;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.activeKey = event.key;
    if (event.key =="Enter"){
      if(this.input == this.randomWord){
        this.input = ''
        this.point ++
      }else{
        this.input=''
        this.point --
      }
      this.input= '';
      this.setRandomWord();
    }
    setTimeout(() => this.activeKey = '', 300); // Reset activeKey sau 100ms
  }

  startGame() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.setRandomWord();
      const gameInterval= setInterval(() => {
        this.totalTime--;
        const elapsedTime = Math.floor((Date.now() - this.currentWord) / 1000);

        //hàm này khi mà 1 từ xuất hiện quá 5s sẽ đổi từ mới
        if (elapsedTime > 5) {
          this.setRandomWord();
        }

        if (this.totalTime <= 0) {
          clearInterval(gameInterval); // Dừng interval khi thời gian kết thúc
        this.gameStarted = false; // Kết thúc trò chơi
        this.totalTime = 0; // Đảm bảo thời gian không âm
          this.gameStarted = false;
        }
      }, 1000);
    }
  }
}
