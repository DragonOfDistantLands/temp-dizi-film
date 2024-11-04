import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const recentlyAdded = [
    { title: "True Detective", status: "Yeni Eklendi", type: "new" },
    { title: "Breaking Bad", status: "6. Sezon Eklendi", type: "updated" },
    { title: "The Bear", status: "Yeni Eklendi", type: "new" },
    { title: "Game of Thrones", status: "Yeni Bölümler Eklendi", type: "updated" },
    { title: "Stranger Things", status: "4. Sezon Güncellendi", type: "updated" },
    { title: "Fargo", status: "Yeni Eklendi", type: "new" },
    { title: "The Witcher", status: "Yeni Bölümler Eklendi", type: "updated" }
  ];

  const weeklyTrends = [
    { title: "Breaking Bad", views: "15243" },
    { title: "Game of Thrones", views: "12453" },
    { title: "Stranger Things", views: "10234" },
    { title: "The Witcher", views: "9676" },
    { title: "Dark", views: "8765" },
    { title: "Peaky Blinders", views: "7654" },
    { title: "Better Call Saul", views: "6543" }
  ];

  const randomRecommendation = {
    title: "Band of Brothers",
    image: "https://source.unsplash.com/random/400x600?nature"
  };

  return (
    <div className="space-y-6 w-full lg:w-[280px]">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Tavsiyemiz</h3>
        <Link to={`/series/${randomRecommendation.title.toLowerCase().replace(/ /g, "-")}`}>
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={randomRecommendation.image} 
              alt={randomRecommendation.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 w-full p-2 bg-black/60">
              <p className="text-white text-center">{randomRecommendation.title}</p>
            </div>
          </div>
        </Link>
      </Card>

      <Card className="p-4 bg-card/95 backdrop-blur-sm">
        <h3 className="font-semibold mb-4">Haftalık Trendler</h3>
        <div className="space-y-2">
          {weeklyTrends.map((trend, index) => (
            <Link 
              key={index}
              to={`/series/${trend.title.toLowerCase().replace(/ /g, "-")}`}
              className="flex justify-between items-center hover:bg-accent/50 p-2 rounded-lg"
            >
              <span>#{trend.title}</span>
              <span className="text-sm text-muted-foreground">{trend.views}</span>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-card/95 backdrop-blur-sm">
        <h3 className="font-semibold mb-4">Son Eklenenler</h3>
        <div className="space-y-3">
          {recentlyAdded.map((item, index) => (
            <Link
              key={index}
              to={`/series/${item.title.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/10 group"
            >
              <span className="text-sm font-medium truncate max-w-[150px]" title={item.title}>
                {item.title}
              </span>
              <span className={`text-xs px-2 py-1 rounded border flex-shrink-0 ml-2 ${
                item.type === 'new' 
                  ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' 
                  : 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10'
              }`}>
                {item.status}
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;