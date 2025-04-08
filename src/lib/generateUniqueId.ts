export default function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}
// This function generates a unique ID by combining the current timestamp with a random string.
// The timestamp ensures that the ID is unique to the moment it was created, while the random string adds an extra layer of uniqueness.
