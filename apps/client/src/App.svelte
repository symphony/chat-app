<script lang="ts">
	let name = "world";
	import { MyCounterButton } from "ui";
	import Header from "./components/Header.svelte";
</script>

<!-- Main component -->
<Header />
<MyCounterButton />

 <!-- Main Section -->
 <main id="main" class="container">
	<header class="">
		<div id="alert" class="">
			<header>
				<h4></h4>
			</header>
			<ul class="collection"></ul>
		</div>
	</header>


	<!-- Main Grid Container 2 columns -->
	<div class="row">

		<!-- Chat Room -->
		<section class="chat col s8">
			<header class="">
				<h4>Chat</h4>
			</header>

			<!-- Message input -->
			<form class="row">
				<div class="input-field col s10">
					<textarea type="text" class="materialize-textarea blue-grey darken-4 white-text text-accent-4"
						maxlength="600">
				</textarea>
				</div>

				<!-- Send button -->
				<a href="#" class="col s2">
					<button type="submit" class="btn waves-effect">Send<i
							class="material-icons left blue-grey-text text-darken-2">textsms</i>
					</button>
				</a>
			</form>

			<!-- Message box -->
			<div class="chatbox blue-grey darken-1 col s12" style="min-height: 30rem;">
				<header>
					<h4></h4>
				</header>

				<ul class="collection blue-grey darken-1">
					<!-- where messages go -->
					<!-- dummy card -->
					<!-- <article class="card-panel grey lighten-5 z-depth-1">
						<section class="row row valign-wrapper">
							<aside class="col s2">
								<img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle responsive-img">
							</aside>
							<div class="col s10">
								<span class="black-text">
									This is a square image. Add the "circle" class to it to make it appear circular.
								</span>
							</div>
						</section>

						<footer class="row col s12">
							<div class="">
								<a href="#">fb</a>
								<a href="#">t</a>
							</div>
						</footer>
					</article> -->
				</ul>

			</div>
		</section>

		<!-- Side panel -->
		<aside id="side-panel" class="col s3 offset-s1">
			<section class="userlist">
				<header>
					<h4>Online</h4>
				</header>
				<main class="blue-grey darken-4">
					<ul class="collection">
						<!-- Userlist -->
						<!-- Dummy user card -->
						<li class="collection-item blue-grey-text text-darken-4">Can't find ul</li>
					</ul>
				</main>
			</section>
		</aside>
	</div>

</main>


<!-- Footer -->
<footer id="footer" class="container">
	<div class="announce">
		<header>
			<h5>log:</h5>
		</header>
		<ul class="collection"></ul>
	</div>
</footer>