mongo
use tvshows
db.tvshows.insert({title: "LOST", year: 2004, country: "USA", poser: "http://ia.media-imdb.com/images/M/MV5BMjA3NzMyMzU1MV5BMl5BanBnXkFtZTcwNjc1ODUwMg@@._V1_SY317_CR17,0,214,317_.jpg", seasons: 6, genre: "Sci-Fi", summary: "The survivors of a plane crash are forced to live with each other on a remote island, a dangerous new world that poses unique threats of its own."});
db.tvshows.find()
exit

mongoimport --db tvshows --collection tvshows --file tvshows.json
mongo
use tvshows
db.tvshows.find()


