// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
//과일 출력
function filterAndSortFruits() {
  let keyword = document.getElementById("searchBox").value;
  let result = []; // 검색어가 들어간 과일을 담을 빈 상자
  fruits.forEach((fruit) => {
    // 과일을 하나씩 꺼내서 확인
    if (fruit.name.includes(keyword)) {
      result.push(fruit);
    }
  });

  // 선택한 정렬 기준 가져오기 (name, low, high 중 하나)
  let sortOption = document.getElementById("sortSelect").value;
  // 기준에 맞게 정렬하기
  if (sortOption === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name)); // 이름순
  } else if (sortOption === "low") {
    result.sort((a, b) => a.price - b.price); // 낮은 가격순
  } else if (sortOption === "high") {
    result.sort((a, b) => b.price - a.price); // 높은 가격순
  }
  renderProducts(result, fruitList); // 화면에 다시 출력
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  // 더 보여줄 채소가 없으면 알림창을 띄우고 끝내기
  if (veggiePage >= veggies.length) {
    alert("상품이 없습니다.");
    return;
  }
  // 보여줄 개수를 3 늘리기
  veggiePage = veggiePage + 3;
  // 채소를 처음부터 end개까지 자르기
  let result = veggies.slice(0, veggiePage);

  renderProducts(result, veggieList); // 화면에 다시 출력
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
