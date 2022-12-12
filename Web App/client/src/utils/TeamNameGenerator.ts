const adjectives = [
  "Adorable", "Adventurous", "Aggressive", "Eager", "Easy", "Elated", "Lazy", "Light", "Lively", "Talented", "Tame", "Tasty", "Delightful", "Depressed", "Determined", "Agreeable", "Alert", "Alive", "Elegant", "Embarrassed", "Enchanting", "Lonely", "Long", "Lovely", "Tender", "Tense", "Terrible", "Defiant", "Itchy", "Jealous",
  "Amused", "Angry", "Annoyed", "Encouraging", "Energetic", "Enthusiastic", "Lucky", "Magnificent", "Misty", "Thankful", "Thoughtful", "Thoughtless", "Cooperative", "Hilarious", "Homeless", "Annoying", "Anxious", "Arrogant", "Envious", "Evil", "Excited", "Modern", "Motionless", "Muddy", "Tired", "Tough", "Troubled", "Creepy",
  "Horrible", "Hungry", "Ashamed", "Attractive", "Average", "Expensive", "Exuberant", "Fair", "Mushy", "Mysterious", "Nasty", "Ugliest", "Ugly", "Uninterested", "Curious", "Ill", "Important", "Awful", "Bad", "Beautiful", "Faithful", "Famous", "Fancy", "Naughty", "Nervous", "Nice", "Unsightly", "Unusual", "Upset", "Dark", "Inexpensive", "Innocent"
  , "Better", "Bewildered", "Black", "Fantastic", "Fierce", "Filthy", "Nutty", "Nerdy", "Data", "Obedient", "Obnoxious", "Uptight", "Vast", "Victorious", "Silly", "Condemned", "Confused",
  "Bloody", "Blue", "Blue-eyed", "Fine", "Foolish", "Fragile", "Odd", "Old-fashioned", "Open", "Vivacious", "Wandering", "Weary", "Smoggy", "Courageous", "Crazy"
  , "Blushing", "Bored", "Brainy", "Frail", "Frantic", "Friendly", "Outrageous", "Outstanding", "Panicky", "Wicked", "Wide-eyed", "Wild", "Splendid", "Crowded", "Cruel"
  , "Brave", "Breakable", "Bright", "Frightened", "Funny", "Gentle", "Perfect", "Plain", "Pleasant", "Witty", "Worried", "Worrisome", "Strange", "Cute", "Dangerous"
  , "Busy", "Calm", "Careful", "Gifted", "Glamorous", "Gleaming", "Poised", "Poor", "Powerful", "Wrong", "Zany", "Zealous", "Jolly", "Joyous", "Kind"
  , "Cautious", "Charming", "Cheerful", "Glorious", "Good", "Gorgeous", "Precious", "Prickly", "Proud", "Different", "Difficult", "Disgusted", "Jittery", "Stupid", "Successful", "Clean", "Clear", "Clever", "Graceful", "Grieving", "Grotesque", "Putrid", "Puzzled", "Quaint", "Distinct", "Disturbed", "Dizzy", "Homely", "Shiny", "Shy",
  "Cloudy", "Clumsy", "Colorful", "Grumpy", "Handsome", "Happy", "Real", "Relieved", "Repulsive", "Doubtful", "Drab", "Dull", "Hurt", "Sleepy", "Smiling", "Combative", "Comfortable", "Concerned", "Healthy", "Helpful", "Helpless", "Rich", "Scary", "Selfish", "Super", "Dead", "Defeated", "Impossible", "Sore", "Sparkling", "Inquisitive", "Spotless", "Stormy",
]

const animals = [
  "Ants", "Dogs", "Cows", "Mules", "Rats", "Chimpanzees", "Bats", "Donkeys", "Tigers", "Nerds", "Data", "Tortoises", "Panthers", "Antelopes", "Bears", "Leopards", "Cheetahs", "Hares",
  "Elephants", "Crabs", "Bees", "Polar bears", "Turtles", "Crows", "Crocodiles", "Alligators", "Birds", "Rabbits", "Porcupines", "Whales", "Hens", "Pigs", "Buffalo", "Pigeons",
  "Albatross", "Ostriches", "Armadillos", "Rabbits", "Cats", "Dolphins", "Frogs", "Emus", "Wolves", "Sheep", "Chickens", "Eagles", "Flying squirrels", "Chameleons", "Monkeys",
  "Tigers", "Cattle", "Goats", "Jackals", "Kangaroo", "Camels", "Whales", "Dogs", "Eels", "Geese", "Dodos", "Hippopotamuses", "Wolves", "Dolphins", "Beagles", "Gorillas", "Bulls",
  "Ibexes", "Zebras", "Ducks", "Beavers", "Orangutans", "Mice", "Iguanas", "Jaguars", "Elephants", "Badgers", "Giraffes", "Vultures", "Jellyfishs", "Lizards", "Fish",
  "Hamsters", "Cobras", "Ducks", "Possums", "Llamas", "Foxes", "Hawks", "Deer", "Elks", "Buffalos", "Rhinoceros", "Frogs", "Lions", "Chihuahua", "Baboons", "Otters", "Wombats",
  "Geese", "Monkeys", "Koalas", "Snakes", "Flamingos", "Sheeps", "Goats", "Owls", "Chinchillas", "Lemurs", "Swans", "Sloths",
  "Horses", "Oxen", "Hedgehogs", "Whales", "Boars", "Racoons", "Kangaroos", "Penguins", "Bison", "Meerkats", "Mammoths", "Lynxes",
  "Owls", "Peacocks", "Moles"
]

export default function generateTeamName(): string {
  return adjectives[Math.floor(Math.random() * adjectives.length)] + " " + animals[Math.floor(Math.random() * animals.length)]
}